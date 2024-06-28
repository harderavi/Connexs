import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import {RootState} from "../store/store"
export default function PrivateRoute() {
  const { user } = useSelector((state:RootState) => state.auth);
  return user ? <Outlet /> : <Navigate to='/signin' />;
}