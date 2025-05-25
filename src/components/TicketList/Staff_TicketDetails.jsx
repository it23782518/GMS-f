import React, { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import StatusChangePreview from './StatusChangePreview';

const getAssignedToInfo = (ticket) => {
  if (!ticket.assignedToId && !ticket.assignedToName) {
    return 'Not assigned';
  }
  
  const name = ticket.assignedToName || 'Unknown';
  const id = ticket.assignedToId || 'N/A';
  
  return `${name} (Staff ID: ${id})`;
};

const TicketDetails = ({ 
  ticket, 
  handleStatusChange, 
  handleUpdateStatus,
  selectedStatuses, 
  loading,
  getTicketId,
  formatDate,
  showUpdateStatus = false // New prop with default false
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [localStatus, setLocalStatus] = useState("");

  useEffect(() => {
    setLocalStatus(selectedStatuses[getTicketId(ticket)] || "");
  }, [selectedStatuses, getTicketId, ticket]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const shortenedDescription = ticket.description && ticket.description.length > 150 
    ? `${ticket.description.substring(0, 150)}...` 
    : ticket.description;

  const onStatusChange = (e) => {
    const newStatus = e.target.value;
    setLocalStatus(newStatus);
    handleStatusChange(getTicketId(ticket), newStatus);
  };

  return (
    <div className="bg-gray-50 p-6 shadow-inner border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First column - Ticket Information */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">Ticket Information</h4>
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">ID:</span>
              <span className="text-sm text-gray-900">{getTicketId(ticket)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Type:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {ticket.type}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Status:</span>
              <StatusBadge status={ticket.status} />
            </p>
            <p className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Priority:</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                ${ticket.priority === 'HIGH' ? 'bg-red-100 text-red-800' : 
                  ticket.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'}`}>
                {ticket.priority}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Created:</span>
              <span className="text-sm text-gray-900">{formatDate(ticket.createdAt)}</span>
            </p>
            {ticket.updatedAt && (
              <p className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Updated:</span>
                <span className="text-sm text-gray-900">{formatDate(ticket.updatedAt)}</span>
              </p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <h5 className="text-sm font-semibold text-gray-700 mb-2">Description:</h5>
            <div className="relative">
              <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-md">
                {showFullDescription ? ticket.description : shortenedDescription}
              </p>
              {ticket.description && ticket.description.length > 150 && (
                <button 
                  onClick={toggleDescription} 
                  className="mt-1 text-xs text-rose-600 hover:text-rose-800 font-medium focus:outline-none"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Second column - User & Assignment */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">Assignment</h4>
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Assigned To:</span>
              <span className="text-sm text-gray-900">{getAssignedToInfo(ticket)}</span>
            </p>
          </div>

          {/* Status Progress Visualization */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <h5 className="text-sm font-semibold text-gray-700 mb-2">Status Progress:</h5>
            <StatusChangePreview currentStatus={ticket.status} />
          </div>

          {/* Status Update UI - Only shown when showUpdateStatus is true */}
          {showUpdateStatus && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <h5 className="text-sm font-semibold text-gray-700 mb-2">Update Status:</h5>
              <div className="space-y-3">
                <div>
                  <select
                    id={`status-select-${getTicketId(ticket)}`}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 text-sm"
                    value={selectedStatuses[getTicketId(ticket)] || ""}
                    onChange={onStatusChange}
                    disabled={loading}
                  >
                    <option value="" disabled>Select a status</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
                
                <button
                  onClick={() => handleUpdateStatus(getTicketId(ticket))}
                  disabled={!selectedStatuses[getTicketId(ticket)] || loading}
                  className={`w-full px-4 py-2 rounded-lg text-white text-sm font-medium ${
                    !selectedStatuses[getTicketId(ticket)] || loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
                  } transition-colors flex items-center justify-center`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357-2H15"></path>
                      </svg>
                      Update Status
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
