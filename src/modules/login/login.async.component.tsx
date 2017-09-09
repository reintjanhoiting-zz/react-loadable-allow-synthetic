import * as React from 'react';

import Loadable, { LoadingComponentProps } from 'react-loadable';

class LoadingComponent extends React.Component<LoadingComponentProps> {
  render() {
    return (
      <div>
        {this.props.error}
        {this.props.isLoading}
        {this.props.pastDelay}
        {this.props.timedOut}
      </div>
    );
  }
}

console.log(Loadable);

const Loadable100 = Loadable({
  // a module shape with 'export = Component' / 'module.exports = Component'
  loader: () => import('./login.component'),
  loading: LoadingComponent,
  delay: 100,
  timeout: 10000
});

export default class LoginAsyncComponent extends React.Component {
  render() {
    return <Loadable100 />;
  }
}