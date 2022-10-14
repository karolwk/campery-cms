import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

type Props = {
  onClick: () => void;
  content: string;
  buttonText: string;
  color?: string;
};

const ViewButton = ({
  onClick,
  color = 'primary',
  content,
  buttonText,
}: Props) => {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Typography>{content}</Typography>
      </CardContent>

      <CardActions>
        <Button onClick={onClick} color={color as 'primary'}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ViewButton;
