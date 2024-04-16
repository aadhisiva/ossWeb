import React, { useEffect }  from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import WebRoutes from "./Authentication/webRoutes";


function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WebRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
