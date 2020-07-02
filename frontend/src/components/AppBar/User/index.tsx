import React from "react";
import {
  FaUserEdit,
  FaCrown,
  FaCog,
  FaHistory,
  FaEdit,
  FaFingerprint,
  FaQuestionCircle,
  FaDoorOpen,
} from "react-icons/fa";
import { connect } from "react-redux";

import * as SessionActions from "@ducks/session/actions";
import { IProfile } from "@ducks/session/types";
import { Dispatch, bindActionCreators } from "redux";

import { ApplicationState } from "@store/index";

import {
  Container, Dropdown, DropdownItem, IconContainer,
} from "./styles";

interface StateProps {
  profile: IProfile | undefined;
}
interface DispatchProps {
  logoutRequest(): void;
}

type Props = StateProps & DispatchProps;
const User: React.FC<Props> = ({ profile, logoutRequest }) => (
  <Container>
    <IconContainer
      id="user-icon"
      data-toggle="dropdown"
      data-target="user-dropdown"
      role="button"
      aria-expanded="false"
      aria-haspopup="true"
      href="/"
    >
      <FaUserEdit size={30} />
    </IconContainer>
    <Dropdown id="user-dropdown" aria-labelledby="user-icon">
      <DropdownItem
        className="dropdown-item"
        type="button"
      >
        <a href="/">
          <FaCog />
          Serviços
        </a>
      </DropdownItem>
      <DropdownItem
        className="dropdown-item"
        type="button"
      >
        <a href="/my-services">
          <FaCrown />
          Meus Serviços
        </a>
      </DropdownItem>
      <DropdownItem
        className="dropdown-item"
        type="button"
      >
        <a href="/hired-services">
          <FaHistory />
          Histórico de Serviços
        </a>
      </DropdownItem>
      <DropdownItem
        className="dropdown-item"
        type="button"
      >
        <FaEdit />
        Editar Perfil
      </DropdownItem>
      <DropdownItem
        className="dropdown-item"
        type="button"
        onClick={logoutRequest}
      >
        <FaFingerprint />
        Protecao
      </DropdownItem>
      <DropdownItem
        className="dropdown-item"
        type="button"
      >
        <FaQuestionCircle />
        Ajuda
      </DropdownItem>
      <DropdownItem
        className="dropdown-item"
        type="button"
        onClick={logoutRequest}
      >
        <FaDoorOpen />
        Sair
      </DropdownItem>
    </Dropdown>
  </Container>
);
const mapStateToProps = ({ session: { profile } }: ApplicationState) => ({
  profile,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(SessionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);
