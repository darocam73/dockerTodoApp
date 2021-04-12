import List from './components/List';
import AppTitle from './components/AppTitle';
import Progress from './components/Progress';
import { ManagedTodoContext } from './hooks/useTodo';

const App = () => {
  return (
    <ManagedTodoContext>
      <div className="container">
        <div className="row mb-5 mt-5">
          <div className="col">
            <AppTitle />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <List />
          </div>
          <div className="col-12 col-lg-6">
            <Progress />
          </div>
        </div>
      </div>
    </ManagedTodoContext>
  );
}

export default App;
