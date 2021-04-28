import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap:"wrap"
  },
  cardActions: {
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-between"
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  
}));