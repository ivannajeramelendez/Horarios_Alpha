import {configureStore} from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'

import { dashboardSlice } from './dashboard/dashboardSlice'
import { uiSlice } from './ui/uiSlice'

export const store =configureStore({
    reducer:{
        auth:authSlice.reducer,
        dashboard:dashboardSlice.reducer,        
        ui:uiSlice.reducer
    }
})