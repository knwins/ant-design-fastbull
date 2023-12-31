import { queryArticleList, removeArticle, updateArticle } from '@/pages/Information/service';
import { useIntl, useRequest } from '@umijs/max';
import { message, Tag } from 'antd';
import { groupBy } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styles from './index.less';
import NoticeIcon from './NoticeIcon';
import NoticeForm from './NoticeModel';
import { ArticleItem } from '@/pages/Information/data';

export type GlobalHeaderRightProps = {
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
};

const getNoticeData = (notices: ArticleItem[]): Record<string, ArticleItem[]> => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice };

    // if (newNotice.pubDate) {
    //   newNotice.pubDate = moment(notice.pubDate as string).fromNow();
    // }

    if (newNotice.id) {
      newNotice.keywords = newNotice.id;
    }

    // if (newNotice.extra && newNotice.status) {
    //   const color = {
    //     todo: '',
    //     processing: 'blue',
    //     urgent: 'red',
    //     doing: 'gold',
    //   }[newNotice.status];
    //   newNotice.extra = (
    //     <Tag
    //       color={color}
    //       style={{
    //         marginRight: 0,
    //       }}
    //     >
    //       {newNotice.extra}
    //     </Tag>
    //   ) as any;
    // }

    return newNotice;
  });
  return groupBy(newNotices, 'type');
};

const getUnreadData = (noticeData: Record<string, ArticleItem[]>) => {
  const unreadMsg: Record<string, number> = {};
  Object.keys(noticeData).forEach((key) => {
    const value = noticeData[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter((item) => !item.status).length;
    }
  });
  return unreadMsg;
};

const NoticeIconView: React.FC = () => {
  const [notices, setNotices] = useState<ArticleItem[]>([]);

  const [iVisible, setiVisible] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Partial<ArticleItem> | undefined>(undefined);


  const handleDone = () => {
    setDone(false);
    setiVisible(false);
  };

  /** 国际化配置 */
  const intl = useIntl();
  const { data } = useRequest(queryArticleList);
  useEffect(() => {
    setNotices(data || []);
  }, [data]);

  const noticeData = getNoticeData(notices);
  const unreadMsg = getUnreadData(noticeData || {});

  const changeReadState = async (id: string) => {
    try {
      //显示公告

      setNotices(
        notices.map((item) => {
          const notice = { ...item };
          if (notice.id === id) {
            if (item.ArticleTypeId == '1') {
              setiVisible(true);
              setCurrentRow(notice);
              return notice;
            }
            //更新服务器数据
            updateArticle(notice);
          }

          return notice;
        }),
      );
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.tip.error',
        }),
      );

      return;
    }
  };

  const clearReadState = async (title: string, key: string) => {
    try {
      //公告不允许删除
      if (key == 'notification') {
        message.error(
          intl.formatMessage({
            id: 'pages.notice.notification.required',
          }),
        );
        return;
      }
      notices.map((item) => {
        const notice = { ...item };
        if (notice.ArticleTypeId === key) {
          //更新服务器数据
          removeArticle(notice);
        }
      });
      setNotices([]);
      message.success(`${'Clear'} ${title}`);
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'pages.tip.error',
        }),
      );

      return;
    }
  };

  return (
    <>
      <NoticeIcon
        className={styles.action}
        //count={6}
        onItemClick={(item) => {
          changeReadState(item.id!);
        }}
        onClear={(title: string, key: string) => clearReadState(title, key)}
        loading={false}
        //  viewMoreText="查看更多"
        //onViewMore={() => message.info('Click on view more')}
        clearText={intl.formatMessage({
          id: 'pages.notice.clear',
        })}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="1"
          count={unreadMsg.notification}
          list={noticeData.notification}
          title={intl.formatMessage({
            id: 'pages.notice.notification',
          })}
          emptyText={intl.formatMessage({
            id: 'pages.tip.error',
          })}
          //showViewMore
        />

        <NoticeIcon.Tab
          tabKey="2"
          count={unreadMsg.message}
          list={noticeData.message}
          title={intl.formatMessage({
            id: 'pages.notice.message',
          })}
          emptyText={intl.formatMessage({
            id: 'pages.tip.error',
          })}
          //showViewMore
        />
      </NoticeIcon>

      <NoticeForm
        visible={iVisible}
        done={done}
        current={currentRow || {}}
        onDone={handleDone}
        onCancel={() => {
          setiVisible(false);
        }}
      />
    </>
  );
};

export default NoticeIconView;
