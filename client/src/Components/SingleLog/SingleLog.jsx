import PropTypes from 'prop-types';

const SingleLog = ({log}) => {
    
    const {course_title} = log;
    
    return (
        <div>
            <li className='text-black text-[1.05rem] font-semibold mb-2'> {course_title} </li>
        </div>
    );
};

SingleLog.propTypes = {
    log: PropTypes.object.isRequired,  // Assuming log is an object with course_title property
}

export default SingleLog;