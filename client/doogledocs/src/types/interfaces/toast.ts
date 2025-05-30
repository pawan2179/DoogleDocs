import { JSX } from "react";
import ActionInterface from "./action";

interface ToastInterface{
  id: string,
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  title?: string | JSX.Element;
  body?: string | JSX.Element;
  actions?: Array<ActionInterface>
}

export default ToastInterface;