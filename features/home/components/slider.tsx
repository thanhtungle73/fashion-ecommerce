import { Image, Row } from '@nextui-org/react';
import * as React from 'react';

export interface ISliderProps {}

export default function Slider(props: ISliderProps) {
  return (
    <Row css={{ '& div': { borderRadius: 0 } }}>
      <Image
        src={
          'https://firebasestorage.googleapis.com/v0/b/test-953fe.appspot.com/o/others%2Fsliders%2Fnew-cat-banner-Garden-Goddesses-Dresses.jpg?alt=media&token=857c0639-0af1-4cb7-bda6-ff8601a11904'
        }
        alt="slider"
      ></Image>
    </Row>
  );
}
