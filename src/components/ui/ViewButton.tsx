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
  buttonText?: string;
  children?: React.ReactNode;
  color?:
    | 'secondary'
    | 'inherit'
    | 'primary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
};

const ViewButton = ({
  onClick,
  color = 'primary',
  content,
  buttonText,
  children,
}: Props) => {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Typography>{content}</Typography>
      </CardContent>

      <CardActions>
        <Button onClick={onClick} color={color}>
          {!children ? buttonText : children}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ViewButton;
