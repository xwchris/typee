import App from './container';
import Lesson from './container/lessons';
import LessonDetail from './container/lesson-detail';
import Home from './container/home';

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
        path: '/lessons',
        exact: true,
        component: Lesson,
      },
      {
        path: '/lesson-detail',
        exact: true,
        component: LessonDetail,
      },
    ],
  },
];

export default routes;
