import LoginForm from '../../components/LoginForm/LoginForm';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  return (
    <div>
      <PageTitle>Please log in</PageTitle>
      <Toaster position="top-center" reverseOrder={false} />
      <LoginForm />
    </div>
  );
}
