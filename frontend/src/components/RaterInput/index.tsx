/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import React, { useRef, useEffect, useState } from "react";

import { useField } from "@unform/core";
import { Rating, RatingProps } from "semantic-ui-react";

interface Props extends RatingProps {
  name: string;
}

const RaterInput: React.FC<Props> = ({ name, ...rest }) => {
  const ratingRef = useRef(null);
  // eslint-disable-next-line
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [stars, setStars] = useState();

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ratingRef.current,
      path: "value"
    });
    console.log(stars);
  }, [fieldName, registerField, stars]);

  return (
    <Rating
      ref={ratingRef}
      onRate={(event, data) => {
        setStars(data.rating);
      }}
      rating={stars}
      {...rest}
    />
  );
};

export default RaterInput;
