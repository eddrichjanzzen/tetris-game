import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import StyledPlayPauseButton from './PlayPauseButton.styles';

const PlayPauseButton = ({ onClick, isPlaying }) => (
  <StyledPlayPauseButton>
    {isPlaying ? 'Play' : ' Pause'}
    <FontAwesomeIcon
      icon={isPlaying ? faPlay : faPause}
      size="xs"
      fixedWidth
      border
      style={{
        marginLeft: '5px',
      }}
    />
  </StyledPlayPauseButton>
);

export default PlayPauseButton;
