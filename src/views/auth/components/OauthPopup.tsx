import React, { ReactChild, useState } from 'react'
import { useAsyncEffect } from 'use-async-effect';
import { useCookies } from 'react-cookie'


interface Props {
  width: number,
  height: number,
  url: string,
  title: string,
  onClose: Function,
  children?: ReactChild,
};


export default (props: Props) => {


  /**
   * 
   */
  const [cookie, setCookie] = useCookies();


  /**
   * @description A variable to store the popup window on start `createPopup`
   * method.
   */
  const [externalWindow, setExternalWindow] = useState<any>();


  useAsyncEffect(() => {
    return () => externalWindow &&
      setExternalWindow(externalWindow.close());
  }, []);


  /**
   * @description Create a method to create and manage the authorization popup.
   */
  const createPopup = () => {
    const { url, title, width, height } = props;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const windowFeatures = `
      toolbar=0,
      scrollbars=1,
      status=1,
      resizable=0,
      location=1,
      menuBar=0,
      width=${width},
      height=${height},
      top=${top},
      left=${left}
    `;


    /**
     * @description Open a popup window on Oauth2 backend address and store it
     * at the `externalWindow` variable. It will newly redirect the user to the
     * SSO system to get the authorization token.
     */
    setExternalWindow(window.open(url, title, windowFeatures));

    console.log(cookie.pas_auth)

    /**
     * @description Start a EventListener using the `storageListener` function.
     */
    if (externalWindow) {
      cookie.pas_auth && externalWindow.close()
      localStorage.getItem('pas_auth') && externalWindow.close();
    }
  };


  return (
    <div onClick={createPopup}>
      {props.children}
    </div>
  );
}
