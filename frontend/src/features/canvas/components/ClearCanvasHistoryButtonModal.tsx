import { useAppDispatch } from 'app/store';
import IAIAlertDialog from 'common/components/IAIAlertDialog';
import IAIButton from 'common/components/IAIButton';
import { clearCanvasHistory } from 'features/canvas/store/canvasSlice';
import { FaTrash } from 'react-icons/fa';

const ClearCanvasHistoryButtonModal = () => {
  const dispatch = useAppDispatch();

  return (
    <IAIAlertDialog
      title={'Clear Canvas History'}
      acceptCallback={() => dispatch(clearCanvasHistory())}
      acceptButtonText={'Clear History'}
      triggerComponent={
        <IAIButton size={'sm'} leftIcon={<FaTrash />}>
          Clear Canvas History
        </IAIButton>
      }
    >
      <p>
        Clearing the canvas history leaves your current canvas intact, but
        irreversibly clears the undo and redo history.
      </p>
      <br />
      <p>Are you sure you want to clear the canvas history?</p>
    </IAIAlertDialog>
  );
};
export default ClearCanvasHistoryButtonModal;
