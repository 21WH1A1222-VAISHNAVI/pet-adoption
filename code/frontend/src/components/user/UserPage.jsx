/*import React, { useState, useEffect, useContext } from 'react'
import { Button, styled, TableRow, TableHead, TableContainer, Paper, Table, TableBody, TableCell, tableCellClasses } from '@mui/material'
import axiosInstance from '../common/AxiosInstance';
import { UserContext } from '../../App';
import { message } from 'antd';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UserPage = () => {
  const user = useContext(UserContext)
  const [allRequests, setAllRequests] = useState([])

  const fetchAllRequestToUser = async () => {
    try {
      const res = await axiosInstance.get('http://localhost:8001/api/user/allrequest', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (res.data.success) {
        setAllRequests(res.data.allRequests)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllRequestForAdmin = async () => {
    try {
      const res = await axiosInstance.get('http://localhost:8001/api/admin/getallrequest', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (res.data.success) {
        setAllRequests(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user.userData.type === "admin") {
      fetchAllRequestForAdmin()
    }
    else {
      fetchAllRequestToUser()
    }
  }, [user.userData.type])

  const changeStatus = async (requestId, showStatus) => {
    let status = showStatus
    try {
      const res = await axiosInstance.post(`http://localhost:8001/api/admin/changestatus/${requestId}`, { status }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (res.data.success) {
        message.success(res.data.message)
        fetchAllRequestForAdmin()
      }
      else {
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }

  }

  const timeFormat = (time) => {
    const changeTime = new Date(time).toLocaleString()
    return changeTime

  }

  return (
    <>
      {
        user.userData.type === "admin" ? <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Pet ID</StyledTableCell>
                <StyledTableCell align="left">Animal Name</StyledTableCell>
                
                <StyledTableCell align="left">User Name</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="left">Created At</StyledTableCell>
                <StyledTableCell align="left">Updated At</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                allRequests?.length > 0 ? (
                  allRequests.map((request) => (
                    <StyledTableRow key={request._id}>
                      <StyledTableCell component="th" scope="row">
                        {request.petId}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {request.petname}
                      </StyledTableCell>
                     
                      <StyledTableCell component="th" scope="row">
                        {request.username}
                      </StyledTableCell>
                      <StyledTableCell style={{ maxWidth: '300px', display: 'flex', justifyContent: "space-evenly" }} component="th" scope="row">
                        {request.status === "Approved" || request.status === "Reject" ? request.status
                          : <Button variant='contained' color='secondary' onClick={() => changeStatus(request._id, "Approved")}>Approve</Button>
                        }
                        {request.status === "Approved" || request.status === "Reject" ? null
                          : <Button variant='contained' color='secondary' onClick={() => changeStatus(request._id, "Reject")}>Reject</Button>
                        }
                      </StyledTableCell >
                      <StyledTableCell component="th" scope="row">
                        {timeFormat(request.createdAt)}
                      </StyledTableCell >
                      <StyledTableCell component="th" scope="row">
                        {timeFormat(request.updatedAt)}
                      </StyledTableCell >
                    </StyledTableRow>
                  )))
                  :
                  (<p className='px-2'>No request found</p>)
              }
            </TableBody>
          </Table>
        </TableContainer> : <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Pet ID</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Created At</StyledTableCell>
                <StyledTableCell align="left">Updated At</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                allRequests?.length > 0 ? (
                  allRequests.map((request) => (
                    <StyledTableRow key={request._id}>
                      <StyledTableCell component="th" scope="row">
                        {request.petId}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {request.name}
                      </StyledTableCell>
                      <StyledTableCell style={{ maxWidth: '300px' }} component="th" scope="row">
                        {request.status}
                      </StyledTableCell >
                      <StyledTableCell component="th" scope="row">
                        {timeFormat(request.createdAt)}
                      </StyledTableCell >
                      <StyledTableCell component="th" scope="row">
                        {timeFormat(request.updatedAt)}
                      </StyledTableCell >
                    </StyledTableRow>
                  )))
                  :
                  (<p className='px-2'>No request found</p>)
              }
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  )
}

export default UserPage


import React, { useState, useEffect, useContext } from 'react';
import { Button, styled, TableRow, TableHead, TableContainer, Paper, Table, TableBody, TableCell, tableCellClasses } from '@mui/material';
import axiosInstance from '../common/AxiosInstance';
import { UserContext } from '../../App';
import { message } from 'antd';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UserPage = () => {
  const { userData } = useContext(UserContext);
  const [allRequests, setAllRequests] = useState([]);

  const fetchAllRequestToUser = async () => {
    try {
      const res = await axiosInstance.get('http://localhost:8001/api/user/allrequest', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setAllRequests(res.data.allRequests);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllRequestForAdmin = async () => {
    try {
      const res = await axiosInstance.get('http://localhost:8001/api/admin/getallrequest', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setAllRequests(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData.type === "admin") {
      fetchAllRequestForAdmin();
    } else {
      fetchAllRequestToUser();
    }
  }, [userData.type]);

  const changeStatus = async (requestId, showStatus) => {
    let status = showStatus;
    try {
      const res = await axiosInstance.post(`http://localhost:8001/api/admin/changestatus/${requestId}`, { status }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        fetchAllRequestForAdmin();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const timeFormat = (time) => {
    const changeTime = new Date(time).toLocaleString();
    return changeTime;
  };

  return (
    <>
      {userData.type === "admin" ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Pet ID</StyledTableCell>
                <StyledTableCell align="left">Animal Name</StyledTableCell>
                <StyledTableCell align="left">User Name</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="left">Created At</StyledTableCell>
                <StyledTableCell align="left">Updated At</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRequests.length > 0 ? (
                allRequests.map((request) => (
                  <StyledTableRow key={request._id}>
                    <StyledTableCell component="th" scope="row">{request.petId}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{request.petname}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{request.username}</StyledTableCell>
                    <StyledTableCell style={{ maxWidth: '300px', display: 'flex', justifyContent: "space-evenly" }} component="th" scope="row">
                      {request.status === "Approved" || request.status === "Reject" ? request.status
                        : <>
                            <Button variant='contained' color='secondary' onClick={() => changeStatus(request._id, "Approved")}>Approve</Button>
                            <Button variant='contained' color='secondary' onClick={() => changeStatus(request._id, "Reject")}>Reject</Button>
                          </>
                      }
                    </StyledTableCell >
                    <StyledTableCell component="th" scope="row">{timeFormat(request.createdAt)}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{timeFormat(request.updatedAt)}</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={6}>
                    <p className='px-2'>No request found</p>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Pet ID</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Created At</StyledTableCell>
                <StyledTableCell align="left">Updated At</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRequests.length > 0 ? (
                allRequests.map((request) => (
                  <StyledTableRow key={request._id}>
                    <StyledTableCell component="th" scope="row">{request.petId}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{request.name}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{request.status}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{timeFormat(request.createdAt)}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{timeFormat(request.updatedAt)}</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={5}>
                    <p className='px-2'>No request found</p>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserPage;
*/
import React, { useState, useEffect, useContext } from 'react';
import { Button, styled, TableRow, TableHead, TableContainer, Paper, Table, TableBody, TableCell, tableCellClasses } from '@mui/material';
import axiosInstance from '../common/AxiosInstance';
import { UserContext } from '../../App';
import { message } from 'antd';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UserPage = () => {
  const { userData } = useContext(UserContext);
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllRequestToUser = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('http://localhost:8001/api/user/allrequest', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setAllRequests(res.data.allRequests);
      } else {
        message.error('Failed to fetch user requests.');
      }
    } catch (error) {
      console.error('Error fetching user requests:', error);
      message.error('An error occurred while fetching user requests.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllRequestForAdmin = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('http://localhost:8001/api/admin/getallrequest', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setAllRequests(res.data.data);
      } else {
        message.error('Failed to fetch admin requests.');
      }
    } catch (error) {
      console.error('Error fetching admin requests:', error);
      message.error('An error occurred while fetching admin requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData.type === "admin") {
      fetchAllRequestForAdmin();
    } else {
      fetchAllRequestToUser();
    }
  }, [userData.type]);

  const changeStatus = async (requestId, showStatus) => {
    try {
      const res = await axiosInstance.post(`http://localhost:8001/api/admin/changestatus/${requestId}`, { status: showStatus }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        fetchAllRequestForAdmin();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error('Error changing status:', error);
      message.error('An error occurred while changing the request status.');
    }
  };

  const timeFormat = (time) => {
    return new Date(time).toLocaleString();
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        userData.type === "admin" ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Pet ID</StyledTableCell>
                  <StyledTableCell align="left">Animal Name</StyledTableCell>
                  <StyledTableCell align="left">User Name</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="left">Created At</StyledTableCell>
                  <StyledTableCell align="left">Updated At</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRequests.length > 0 ? (
                  allRequests.map((request) => (
                    <StyledTableRow key={request._id}>
                      <StyledTableCell>{request.petId}</StyledTableCell>
                      <StyledTableCell>{request.petname}</StyledTableCell>
                      <StyledTableCell>{request.username}</StyledTableCell>
                      <StyledTableCell style={{ maxWidth: '300px', display: 'flex', justifyContent: "space-evenly" }}>
                        {request.status === "Approved" || request.status === "Reject" ? request.status : (
                          <>
                            <Button variant='contained' color='secondary' onClick={() => changeStatus(request._id, "Approved")}>Approve</Button>
                            <Button variant='contained' color='secondary' onClick={() => changeStatus(request._id, "Reject")}>Reject</Button>
                          </>
                        )}
                      </StyledTableCell>
                      <StyledTableCell>{timeFormat(request.createdAt)}</StyledTableCell>
                      <StyledTableCell>{timeFormat(request.updatedAt)}</StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={6}>
                      <p className='px-2'>No request found</p>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Pet ID</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Created At</StyledTableCell>
                  <StyledTableCell align="left">Updated At</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRequests.length > 0 ? (
                  allRequests.map((request) => (
                    <StyledTableRow key={request._id}>
                      <StyledTableCell>{request.petId}</StyledTableCell>
                      <StyledTableCell>{request.name}</StyledTableCell>
                      <StyledTableCell>{request.status}</StyledTableCell>
                      <StyledTableCell>{timeFormat(request.createdAt)}</StyledTableCell>
                      <StyledTableCell>{timeFormat(request.updatedAt)}</StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={5}>
                      <p className='px-2'>No request found</p>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
    </>
  );
};

export default UserPage;








