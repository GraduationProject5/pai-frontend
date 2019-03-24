import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import 'antd/dist/antd.less';
import './index.scss';

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});
app.model(require('./models/user').default);
app.model(require('./models/data').default);
app.model(require('./models/experiment').default);
app.model(require('./models/component').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

