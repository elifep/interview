import EditButton from './buttons/EditButton';
import DeleteButton from './buttons/DeleteButton';
import ToggleSwitch from './buttons/ToggleSwitch';

function InterviewList({ interviews = [], onEdit, onDelete, togglePublished }) {
    return (<div className="w-full mt-6 bg-white shadow-md rounded-md">
        {interviews.length > 0 ? (
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-indigo-600 text-white">
                        <th className="p-4 text-left">Order</th>
                        <th className="p-4 text-left">Interview Title</th>
                        <th className="p-4 text-left">Published</th>
                        <th className="p-4 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {interviews.map((interview, index) => (
                        <tr key={interview._id} className="border-b"> {/* Fazladan boşluk yok */}
                            <td className="p-4">{index + 1}</td>
                            <td className="p-4">{interview.title}</td>
                            <td className="p-4">
                                <ToggleSwitch
                                    isPublished={interview.published}
                                    onToggle={() => togglePublished(interview._id, interview.published)}
                                />
                            </td>
                            <td className="p-4 flex space-x-2">
                                <EditButton onClick={() => onEdit(interview)} />
                                <DeleteButton onClick={() => onDelete(interview._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p className="text-center p-4">No interviews available.</p>
        )}
    </div>
    );
}

export default InterviewList;
