import { Flex, ListItem, Tooltip, UnorderedList } from '@chakra-ui/react';
import { useHotkeys } from 'react-hotkeys-hook';
import { FaPlay } from 'react-icons/fa';
import { readinessSelector } from 'app/selectors/readinessSelector';
import { generateImage } from 'app/socketio/actions';
import { useAppDispatch, useAppSelector } from 'app/store';
import IAIButton, { IAIButtonProps } from 'common/components/IAIButton';
import IAIIconButton, {
  IAIIconButtonProps,
} from 'common/components/IAIIconButton';
import IAIPopover from 'common/components/IAIPopover';
import { activeTabNameSelector } from 'features/options/store/optionsSelectors';

interface InvokeButton
  extends Omit<IAIButtonProps | IAIIconButtonProps, 'aria-label'> {
  iconButton?: boolean;
}

export default function InvokeButton(props: InvokeButton) {
  const { iconButton = false, ...rest } = props;
  const dispatch = useAppDispatch();
  const { isReady, reasonsWhyNotReady } = useAppSelector(readinessSelector);
  const activeTabName = useAppSelector(activeTabNameSelector);

  const handleClickGenerate = () => {
    dispatch(generateImage(activeTabName));
  };

  useHotkeys(
    ['ctrl+enter', 'meta+enter'],
    () => {
      if (isReady) {
        dispatch(generateImage(activeTabName));
      }
    },
    [isReady, activeTabName]
  );

  return (
    <div style={{ flexGrow: 4 }}>
      {iconButton ? (
        <IAIIconButton
          aria-label="Invoke"
          type="submit"
          icon={<FaPlay />}
          isDisabled={!isReady}
          onClick={handleClickGenerate}
          className="invoke-btn"
          tooltip="Invoke"
          tooltipProps={{ placement: 'bottom' }}
          {...rest}
        />
      ) : (
        <IAIButton
          aria-label="Invoke"
          type="submit"
          isDisabled={!isReady}
          onClick={handleClickGenerate}
          className="invoke-btn"
          {...rest}
        >
          Invoke
        </IAIButton>
      )}
    </div>
  );
}