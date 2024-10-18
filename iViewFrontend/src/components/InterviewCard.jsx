import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function InterviewCard({ interview }) {
    const navigate = useNavigate();

    const handleSeeVideos = (interviewId) => {
        navigate(`/video-collection/${interviewId}`); // Videoları görme
    };

    // Mülakatın linkini kopyalama işlevi
    const handleCopyLink = () => {
        if (interview.link) {
            navigator.clipboard.writeText(interview.link); // Tarayıcıda panoya kopyalama işlemi
            alert('Başvuru linki kopyalandı!');
        } else {
            alert('Mülakat yayında değil.');
        }
    };

    return (
        <div className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-indigo-700">{interview.title}</h3>
                {interview.link && (
                    <button
                        onClick={handleCopyLink}
                        className="text-gray-400 hover:text-indigo-600 transition-all duration-150"
                    >
                        <i className="fas fa-link"></i> Copy Link
                    </button>
                )}
            </div>

            <div className="bg-indigo-50 p-4 rounded-md shadow-inner">
                <p className="text-sm font-medium text-gray-600 mb-2">Candidates: {interview.total || 0}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
                <p className={`text-sm font-medium ${interview.published ? 'text-green-500' : 'text-red-500'}`}>
                    {interview.published ? 'Published' : 'Not Published'}
                </p>
                <button
                    className="text-sm font-medium text-blue-500 hover:text-blue-700 transition-all duration-150"
                    onClick={() => handleSeeVideos(interview._id)} // Burada _id kullanıyoruz
                >
                    See Videos &gt;
                </button>
            </div>
        </div>
    );
}

// PropTypes tanımlaması
InterviewCard.propTypes = {
    interview: PropTypes.shape({
        title: PropTypes.string.isRequired,
        total: PropTypes.number,
        published: PropTypes.bool.isRequired,
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // _id kullanıyoruz
        link: PropTypes.string, // Link isteğe bağlı, çünkü yayında olmayan mülakatların linki olmayacak
    }).isRequired,
};

export default InterviewCard;
