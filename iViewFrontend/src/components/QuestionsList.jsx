import React from 'react';
import EditButton from './buttons/EditButton';
import DeleteButton from './buttons/DeleteButton';

function QuestionList({ questions = [], onEdit, onDelete }) {
    return (
        <div className="w-full mt-6 bg-white shadow-md rounded-md">
            {questions.length > 0 ? (
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="p-4 text-left">Order</th>
                            <th className="p-4 text-left">Question</th>
                            <th className="p-4 text-left">Time (min)</th>
                            <th className="p-4 text-left">Category</th> {/* Kategori ekledik */}
                            <th className="p-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => (
                            <tr key={question._id} className="border-b">
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">{question.questionText}</td> {/* questionText backend modeline göre düzenlendi */}
                                <td className="p-4">{question.timeLimit || 'N/A'}</td> {/* timeLimit backend'den gelen veriyle uyumlu */}
                                <td className="p-4">{question.topic || 'N/A'}</td> {/* Sorunun kategorisi */}
                                <td className="p-4 flex space-x-2">
                                    <EditButton onClick={() => onEdit(question)} />
                                    <DeleteButton onClick={() => onDelete(question._id)} /> {/* Silme işlemi için _id kullanılıyor */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center p-4">No questions available.</p>
            )}
        </div>
    );
}

export default QuestionList;
