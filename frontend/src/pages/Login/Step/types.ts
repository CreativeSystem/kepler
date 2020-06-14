import { MouseEvent as ReactMouseEvent } from "react";

type clickEvent = ReactMouseEvent<HTMLButtonElement, MouseEvent>

export interface Props{
  title: string,
  description?: string,
  backActive?: boolean,
  nextButtonText?:string,
  onBackPressed?(event:clickEvent):void,
  onNextPressed(event:clickEvent):void
}
