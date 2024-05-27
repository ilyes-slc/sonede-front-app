import {AuthProvider} from "./context/AuthContext";
import {AxiosProvider} from "./context/AxiosContext";
import Wrapper from "./wrapper";
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';

const App = () => {
  return (
      <AuthProvider>
        <AxiosProvider>
            <TailwindProvider utilities={utilities}>
                <Wrapper />
            </TailwindProvider>
        </AxiosProvider>
      </AuthProvider>
  );
};

export default App;
