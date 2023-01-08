import classes from './Image.module.css';

const Image = (props) => {
  return (<div>
    <img className={classes.image}
      src={props.source}
      alt={props.alternate}/>
  </div>);
};

export default Image;