import App from './scenes';
import LessonList from './scenes/LessonList';
import LessonDetail from './scenes/LessonDetail';
import Home from './scenes/Home';
import ProblemFeedback from './scenes/ProblemFeedback';
import AboutUs from './scenes/AboutUs';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      }, {
        path: '/lesson-list',
        component: LessonList,
      }, {
        path: '/lesson-detail/:fileId/:pageId',
        component: LessonDetail,
      }, {
        path: '/problem-feedback',
        component: ProblemFeedback,
      }, {
        path: '/about-us',
        component: AboutUs,
      },
    ],
  },
];

export default routes;
