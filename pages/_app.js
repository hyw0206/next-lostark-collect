import "../styles/globals.css";

import { ErrorBoundary } from "react-error-boundary";
import SearchPage from "../src/components/Search";

export default function App({ Component, pageProps }) {

 
  return (
    
      <div className="w-full mt-16 flex flex-col  items-center">
        <ErrorBoundary fallbackRender={<Error />}>
          <SearchPage /> 
          <Component {...pageProps} />  
        </ErrorBoundary>
      </div>
    
  )
}