import App from './scenes';
import LessonList from './scenes/LessonList';
import LessonDetail from './scenes/LessonDetail';
import Home from './scenes/Home';
import ProblemFeedback from './scenes/ProblemFeedback';
import AboutUs from './scenes/AboutUs';
import UserCenter from './scenes/UserCenter';
import Admin from './scenes/Admin';

const routes = [
  {
    component: App,
    routes: [
      {
        // 主页
        path: '/',
        exact: true,
        component: Home,
      }, {
        // 课程列表页
        path: '/lesson-list',
        component: LessonList,
      }, {
        // 课程详情页
        path: '/lesson-detail/:fileId/:pageId',
        component: LessonDetail,
      }, {
        // 反馈页
        path: '/problem-feedback',
        component: ProblemFeedback,
      }, {
        // 关于我们
        path: '/about-us',
        component: AboutUs,
      }, {
        // 用户中心
        path: '/user-center',
        component: UserCenter,
      }, {
        // 管理后台
        path: '/admin',
        component: Admin,
      },
    ],
  },
];

export default routes;
