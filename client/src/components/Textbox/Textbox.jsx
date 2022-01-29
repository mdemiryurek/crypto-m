import PropTypes from 'prop-types';
import styles from './Textbox.module.scss';

const Textbox = (props) => {
    return(
        <div className={`${(styles.container)} ${(styles[props.fieldStyle])}`}>
            <input id={props.name}
                placeholder={props.placeHolder}
                type={props.type}
                step='0.0001'
                value={props.value}
                className={styles.field}
                onChange={(e) => props.handleChange(e, props.name)}/>
        </div>
    )
}

Textbox.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    type: PropTypes.oneOf(['text', 'number']),
    disabled: PropTypes.bool,
    handleChange: PropTypes.func,
    placeHolder: PropTypes.string,
    fieldStyle: PropTypes.oneOf(['default', 'secondary'])
}

Textbox.defaultProps = {
    type: 'text',
    fieldStyle: 'default',
    disabled: false
}

export default Textbox;