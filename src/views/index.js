import Dashboard from './shared/Dashboard';
import Buttons from './elements/Buttons';
import Alerts from './elements/Alerts';
import Grid from './elements/Grid';
import Typography from './elements/Typography';
import Cards from './elements/Cards';
import Tabs from './elements/Tabs';
import Tables from './elements/Tables';
import Breadcrumbs from './elements/Breadcrumbs';
import Forms from './elements/Forms';
import Loaders from './elements/Loaders';
import Avatars from './elements/Avatars';
import Invoice from './shared/Invoice';
import Analytics from './shared/Analytics';
import CmsPage from './shared/Cms';
import Widgets from './shared/Widgets';
import BlankPage from './shared/BlankPage';
import SubNav from './shared/SubNav';
import Feed from './shared/Feed';
import Modals from './elements/Modals';
import ProgressBars from './elements/ProgressBars';
import PaginationPage from './elements/Pagination';
import ErrorPage from './shared/404';

import { Clades } from './clades/index';
import { ProjectsList, ProjectsDetails, ProjectsCreate, ProjectsUpdate } from './projects/index';
import { LoginPage } from './auth/index';


// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Dashboard',
    path: '/home',
    component: Dashboard,
  },
  {
    name: 'Buttons',
    path: '/elements/buttons',
    component: Buttons,
  },
  {
    name: 'Alerts',
    path: '/elements/alerts',
    component: Alerts,
  },
  {
    name: 'Grid',
    path: '/elements/grid',
    component: Grid,
  },
  {
    name: 'Typography',
    path: '/elements/typography',
    component: Typography,
  },
  {
    name: 'Cards',
    path: '/elements/cards',
    component: Cards,
  },
  {
    name: 'Tabs',
    path: '/elements/tabs',
    component: Tabs,
  },
  {
    name: 'Tables',
    path: '/elements/tables',
    component: Tables,
  },
  {
    name: 'Progress Bars',
    path: '/elements/progressbars',
    component: ProgressBars,
  },
  {
    name: 'Pagination',
    path: '/elements/pagination',
    component: PaginationPage,
  },
  {
    name: 'Modals',
    path: '/elements/modals',
    component: Modals,
  },
  {
    name: 'Breadcrumbs',
    path: '/elements/breadcrumbs',
    component: Breadcrumbs,
  },
  {
    name: 'Forms',
    path: '/elements/forms',
    component: Forms,
  },
  {
    name: 'Loaders',
    path: '/elements/loaders',
    component: Loaders,
  },
  {
    name: 'Avatars',
    path: '/elements/avatars',
    component: Avatars,
  },
  {
    name: 'Blank',
    path: '/pages/blank',
    component: BlankPage,
  },
  {
    name: 'Sub Navigation',
    path: '/pages/subnav',
    component: SubNav,
  },
  {
    name: '404',
    path: '/pages/404',
    component: ErrorPage,
  },
  {
    name: 'Analytics',
    path: '/apps/analytics',
    component: Analytics,
  },
  {
    name: 'Activity Feed',
    path: '/apps/feed',
    component: Feed,
  },
  {
    name: 'Invoice',
    path: '/apps/invoice',
    component: Invoice,
  },
  {
    name: 'CMS',
    path: '/apps/cms',
    component: CmsPage,
  },
  {
    name: 'Widgets',
    path: '/widgets',
    component: Widgets,
  },

  /**
   * Projects routes.
   */
  {
    is_private: true,
    name: 'Projects',
    path: '/projects',
    component: ProjectsList,
  },
  {
    is_private: true,
    name: 'Create',
    path: '/projects/new',
    component: ProjectsCreate,
  },
  {
    is_private: true,
    name: 'Details',
    path: '/projects/:pid',
    component: ProjectsDetails,
  },
  {
    is_private: true,
    name: 'Edit',
    path: '/projects/:pid/edit',
    component: ProjectsUpdate,
  },


  /**
   * Clades routes.
   */
  {
    is_private: true,
    name: 'Clades',
    path: '/projects/:pid/:tid/clades',
    component: Clades,
  },

  /**
   * Auth routes.
   */
  {
    name: 'Login',
    path: '/auth',
    component: LoginPage,
  },
];

export default pageList;
