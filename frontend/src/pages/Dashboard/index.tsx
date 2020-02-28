import React, { useState } from "react";
import { connect } from "react-redux";

import Card from "@components/Card";
import Loading from "@components/Loading";
import { SessionState } from "@ducks/session/types";
import { ApplicationState } from "@store/index";

type StateProps = SessionState;

type Props = StateProps;

const Dashboard: React.FC<Props> = ({ profile }) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 4000);

  return (
    <div className="row col-md-12">
      {loading && <Loading />}
    </div>
  );
};
const mapStateToProps = ({ session: { profile } }: ApplicationState) => ({
  profile,
});
export default connect(mapStateToProps)(Dashboard);
