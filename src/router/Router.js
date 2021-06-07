import { BrowserRouter as AppRouter, Route, Switch, Redirect } from 'react-router-dom'

import React from 'react'
import  Home  from '../views/Home'
import Detail from '../views/Detail'

function Router() {
    return (
        <div>
            <AppRouter>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/detail/:name' exact component={Detail} />
                </Switch>
            </AppRouter>
            
        </div>
    )
}

export default Router
