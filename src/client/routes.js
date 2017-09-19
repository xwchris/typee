import App from './scenes';
import LessonList from './scenes/LessonList';
import LessonDetail from './scenes/LessonDetail';
import Home from './scenes/Home';
import ProblemFeedback from './scenes/ProblemFeedback';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/lesson-list',
        component: LessonList,
      },
      {
        path: '/lesson-detail/:lessonId/:fileIndex',
        component: LessonDetail,
      },
      {
        path: '/problem-feedback',
        component: ProblemFeedback,
      },
    ],
  },
];

export default routes;
