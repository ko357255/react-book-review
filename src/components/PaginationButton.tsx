import { Button } from 'react-bootstrap';

type Props = {
  prevOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  nextOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
};

const PaginationButton = ({
  prevOnClick,
  nextOnClick,
  prevDisabled = false,
  nextDisabled = false,
}: Props) => {
  return (
    <div className="d-flex justify-content-center gap-2">
      <Button variant="primary" onClick={prevOnClick} disabled={prevDisabled}>
        {'<'}
      </Button>
      <Button variant="primary" onClick={nextOnClick} disabled={nextDisabled}>
        {'>'}
      </Button>
    </div>
  );
};

export default PaginationButton;
