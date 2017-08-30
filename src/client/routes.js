import App from './scenes';
import LessonList from './scenes/LessonList';
import LessonDetail from './scenes/LessonDetail';
import Home from './scenes/Home';

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
        path: '/lesson-detail',
        component: LessonDetail,
      },
    ],
  },
];

export default routes;
