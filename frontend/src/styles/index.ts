import { createGlobalStyle } from "styled-components";

import { ITheme } from "./theme";

interface Props {
  theme: ITheme;
}

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin:0;
    padding:0;
  }
  html,body,#root{
    padding: 0;
    margin: 0;
    width: 100vw;
    box-sizing: border-box;
    border: 0;
  }
  #root{
    background-color: ${({ theme: { default: Default } }: Props) => Default.bg};
  }
  #root .btn.btn-info{
    background-color: ${({ theme }: Props) => theme.info.bg};
    color:${({ theme }: Props) => theme.info.fg};
    border-color:${({ theme }: Props) => theme.info.bg};
  }
  #root .btn.btn-info:hover{
    background-color: ${({ theme }: Props) => theme.info.bg};
    color:${({ theme }: Props) => theme.info.fg};
    border-color:${({ theme }: Props) => theme.info.bg};
    opacity: 0.8;
  }
  
  #root .btn-info:focus, #root .btn-info.focus {
    background-color: ${({ theme }: Props) => theme.info.bg};
    color:${({ theme }: Props) => theme.info.fg};
    border-color:${({ theme }: Props) => theme.info.bg};
    box-shadow: 0 0 0 0.2rem ${({ theme }: Props) => `${theme.info.bg}77`};
  }

  #root .btn-info:not(:disabled):not(.disabled):active,#root .btn-info:not(:disabled):not(.disabled).active,
  .show > .btn-info.dropdown-toggle {
    background-color: ${({ theme }: Props) => theme.info.bg};
    color:${({ theme }: Props) => theme.info.fg};
    border-color:${({ theme }: Props) => theme.info.bg};
  }

  #root .btn-info:not(:disabled):not(.disabled):active:focus,#root .btn-info:not(:disabled):not(.disabled).active:focus,
  .show > .btn-info.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem ${({ theme }: Props) => `${theme.info.bg}77`};
  }

  #root .text-info{
    color:${({ theme }: Props) => theme.info.bg}!important;
  }

  #root .btn.btn-primary{
    background-color: ${({ theme }: Props) => theme.primary.bg};
    color:${({ theme }: Props) => theme.primary.fg};
    border-color:${({ theme }: Props) => theme.primary.bg};
  }
  #root .btn.btn-primary:hover{
    background-color: ${({ theme }: Props) => theme.primary.bg};
    color:${({ theme }: Props) => theme.primary.fg};
    border-color:${({ theme }: Props) => theme.primary.bg};
    opacity: 0.8;
  }
  
  #root .btn-primary:focus, #root .btn-primary.focus {
    background-color: ${({ theme }: Props) => theme.primary.bg};
    color:${({ theme }: Props) => theme.primary.fg};
    border-color:${({ theme }: Props) => theme.primary.bg};
    box-shadow: 0 0 0 0.2rem ${({ theme }: Props) => `${theme.primary.bg}77`};
  }

  #root .btn-primary:not(:disabled):not(.disabled):active,#root .btn-primary:not(:disabled):not(.disabled).active,
  .show > .btn-primary.dropdown-toggle {
    background-color: ${({ theme }: Props) => theme.primary.bg};
    color:${({ theme }: Props) => theme.primary.fg};
    border-color:${({ theme }: Props) => theme.primary.bg};
  }

  #root .btn-primary:not(:disabled):not(.disabled):active:focus,#root .btn-primary:not(:disabled):not(.disabled).active:focus,
  .show > .btn-primary.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem ${({ theme }: Props) => `${theme.primary.bg}77`};
  }

  #root .text-primary{
    color:${({ theme }: Props) => theme.primary.bg}!important;
  }
  
  #root .btn.btn-success{
    background-color: ${({ theme }: Props) => theme.success.bg};
    color:${({ theme }: Props) => theme.success.fg};
    border-color:${({ theme }: Props) => theme.success.bg};
  }
  #root .btn.btn-success:hover{
    background-color: ${({ theme }: Props) => theme.success.bg};
    color:${({ theme }: Props) => theme.success.fg};
    border-color:${({ theme }: Props) => theme.success.bg};
    opacity: 0.8;
  }
  
  #root .btn-success:focus, #root .btn-success.focus {
    background-color: ${({ theme }: Props) => theme.success.bg};
    color:${({ theme }: Props) => theme.success.fg};
    border-color:${({ theme }: Props) => theme.success.bg};
    box-shadow: 0 0 0 0.2rem ${({ theme }: Props) => `${theme.success.bg}77`};
  }

  #root .btn-success:not(:disabled):not(.disabled):active,#root .btn-success:not(:disabled):not(.disabled).active,
  .show > .btn-success.dropdown-toggle {
    background-color: ${({ theme }: Props) => theme.success.bg};
    color:${({ theme }: Props) => theme.success.fg};
    border-color:${({ theme }: Props) => theme.success.bg};
  }

  #root .btn-success:not(:disabled):not(.disabled):active:focus,#root .btn-success:not(:disabled):not(.disabled).active:focus,
  .show > .btn-success.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem ${({ theme }: Props) => `${theme.success.bg}77`};
  }

  #root .text-success{
    color:${({ theme }: Props) => theme.success.bg}!important;
  }

  #root .btn.btn-danger{
    background-color: ${({ theme }: Props) => theme.danger.bg};
    color:${({ theme }: Props) => theme.danger.fg};
    border-color:${({ theme }: Props) => theme.danger.bg};
  }
  #root .btn.btn-danger:hover{
    background-color: ${({ theme }: Props) => theme.danger.bg};
    color:${({ theme }: Props) => theme.danger.fg};
    border-color:${({ theme }: Props) => theme.danger.bg};
    opacity: 0.8;
  }
  
  #root .btn-danger:focus, #root .btn-danger.focus {
    background-color: ${({ theme }: Props) => theme.danger.bg};
    color:${({ theme }: Props) => theme.danger.fg};
    border-color:${({ theme }: Props) => theme.danger.bg};
    box-shadow: 0 0 0 0.2rem ${({ theme }: Props) => `${theme.danger.bg}77`};
  }

  #root .btn-danger:not(:disabled):not(.disabled):active,#root .btn-danger:not(:disabled):not(.disabled).active,
  .show > .btn-danger.dropdown-toggle {
    background-color: ${({ theme }: Props) => theme.danger.bg};
    color:${({ theme }: Props) => theme.danger.fg};
    border-color:${({ theme }: Props) => theme.danger.bg};
  }

  #root .btn-danger:not(:disabled):not(.disabled):active:focus,#root .btn-danger:not(:disabled):not(.disabled).active:focus,
  .show > .btn-danger.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem ${({ theme }: Props) => `${theme.danger.bg}77`};
  }

  #root .text-danger{
    color:${({ theme }: Props) => theme.danger.bg}!important;
  }

  #root .btn.btn-warning{
    background-color: ${({ theme }: Props) => theme.warning.bg};
    color:${({ theme }: Props) => theme.warning.fg};
    border-color:${({ theme }: Props) => theme.warning.bg};
  }
  #root .btn.btn-warning:hover{
    background-color: ${({ theme }: Props) => theme.warning.bg};
    color:${({ theme }: Props) => theme.warning.fg};
    border-color:${({ theme }: Props) => theme.warning.bg};
    opacity: 0.8;
  }
  
  #root .btn-warning:focus, #root .btn-warning.focus {
    background-color: ${({ theme }: Props) => theme.warning.bg};
    color:${({ theme }: Props) => theme.warning.fg};
    border-color:${({ theme }: Props) => theme.warning.bg};
    box-shadow: 0 0 0 0.2rem ${({ theme }: Props) => `${theme.warning.bg}77`};
  }

  #root .btn-warning:not(:disabled):not(.disabled):active,#root .btn-warning:not(:disabled):not(.disabled).active,
  .show > .btn-warning.dropdown-toggle {
    background-color: ${({ theme }: Props) => theme.warning.bg};
    color:${({ theme }: Props) => theme.warning.fg};
    border-color:${({ theme }: Props) => theme.warning.bg};
  }

  #root .btn-warning:not(:disabled):not(.disabled):active:focus,#root .btn-warning:not(:disabled):not(.disabled).active:focus,
  .show > .btn-warning.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem ${({ theme }: Props) => `${theme.warning.bg}77`};
  }

  #root .text-warning{
    color:${({ theme }: Props) => theme.warning.bg}!important;
  }

  #root .btn.btn-default{
    background-color: ${({ theme }: Props) => theme.default.bg};
    color:${({ theme }: Props) => theme.default.fg};
    border-color:${({ theme }: Props) => theme.default.bg};
  }
  #root .btn.btn-default:hover{
    background-color: ${({ theme }: Props) => theme.default.bg};
    color:${({ theme }: Props) => theme.default.fg};
    border-color:${({ theme }: Props) => theme.default.bg};
    opacity: 0.8;
  }
  
  #root .btn-default:focus, #root .btn-default.focus {
    background-color: ${({ theme }: Props) => theme.default.bg};
    color:${({ theme }: Props) => theme.default.fg};
    border-color:${({ theme }: Props) => theme.default.bg};
    box-shadow: 0 0 0 0.2rem ${({ theme }: Props) => `${theme.default.bg}77`};
  }

  #root .btn-default:not(:disabled):not(.disabled):active,#root .btn-default:not(:disabled):not(.disabled).active,
  .show > .btn-default.dropdown-toggle {
    background-color: ${({ theme }: Props) => theme.default.bg};
    color:${({ theme }: Props) => theme.default.fg};
    border-color:${({ theme }: Props) => theme.default.bg};
  }

  #root .btn-default:not(:disabled):not(.disabled):active:focus,#root .btn-default:not(:disabled):not(.disabled).active:focus,
  .show > .btn-default.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem ${({ theme }: Props) => `${theme.default.bg}77`};
  }

  #root .text-default{
    color:${({ theme }: Props) => theme.default.bg}!important;
  }
  
  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
  .rotate{
    -webkit-animation:spin 3s linear infinite;
    -moz-animation:spin 3s linear infinite;
    animation:spin 3s linear infinite;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
  body #root ::-webkit-scrollbar-track {
    box-shadow: -1px 0px 6px #22222222;
    border-radius: 5px;
    background-color: #00000000;
  }
  body #root ::-webkit-scrollbar-thumb {
    background: ${({ theme }: Props) => `${theme.primary.bg}99`};
    border-radius: 5px;
  }
  body #root ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }: Props) => `${theme.primary.bg}cc`};
  }

  @keyframes wiggle {
    0% { transform: rotate(0deg); }
   80% { transform: rotate(0deg); }
   85% { transform: rotate(5deg); }
   95% { transform: rotate(-5deg); }
   100% { transform: rotate(0deg); }
  }

`;
