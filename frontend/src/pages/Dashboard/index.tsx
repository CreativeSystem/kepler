import React, { useState } from "react";

import { connect } from "react-redux";

import { ApplicationState } from "@store/index";
import { SessionState } from "@ducks/session/types";
import Loading from "@components/Loading";

import Card from "@components/Card";
import Header from "@components/Header";

interface StateProps extends SessionState {}

type Props = StateProps;

const Dashboard: React.FC<Props> = ({ profile }) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 4000);

  return (
    <div>
      {/* {loading && <Loading />} */}
      {!loading
        && <Header />
      }
    </div>
  );
};
const mapStateToProps = ({ session: { profile } }: ApplicationState) => ({
  profile,
});
export default connect(mapStateToProps)(Dashboard);
