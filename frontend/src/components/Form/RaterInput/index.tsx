/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import React, { useRef, useEffect, useState } from "react";

import { useField } from "@unform/core";
import { Rating, RatingProps } from "semantic-ui-react";

import { Label, Container } from "../styles";

interface Props extends RatingProps {
  name: string;
  label: string;
}

const RaterInput: React.FC<Props> = ({ name, label, ...rest }) => {
  const ratingRef = useRef(null);
  // eslint-disable-next-line
  const {
    fieldName,
    registerField,
    defaultValue = { ...rest }.defaultRating
  } = useField(name);
  const [stars, setStars] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ratingRef.current,
      path: "props.rating"
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Label>{label}</Label>
      <Rating
        ref={ratingRef}
        onRate={(event, data) => {
          setStars(data.rating);
        }}
        rating={stars}
        {...rest}
        defaultRating={defaultValue}
      />
    </Container>
  );
};

export default RaterInput;
