import React from 'react'

import Header from '/imports/ui/components/Header'
import {renderRoutes} from '/imports/startup/client/routes'

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        {renderRoutes()}
      </div>
    )
  }

}
