import App from './scenes';
import LessonList from './scenes/LessonList';
import LessonDetail from './scenes/LessonDetail';
import ProblemFeedback from './scenes/ProblemFeedback';
import AboutUs from './scenes/AboutUs';
import UserCenter from './scenes/UserCenter';
import Admin from './scenes/Admin';
import AdminHome from './scenes/Admin/scenes/Home';
import AdminLogin from './scenes/Admin/scenes/Login';

const routes = [
  {
    component: Admin,
    path: '/admin',
    routes: [
      {
        component: AdminHome,
        exact: true,
        path: '/admin',
      }, {
        component: AdminLogin,
        path: '/admin/login',
      },
    ],
  }, {
    component: App,
    path: '/',
    routes: [
      {
        // 课程列表页
        path: '/',
        exact: true,
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
      },
    ],
  },
];

export default routes;
