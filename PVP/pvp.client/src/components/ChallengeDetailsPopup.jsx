import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ChallengeDetailsPopup({ challenge, onClose }) {
    return (
        <Dialog open={challenge !== null} onClose={onClose}>
            <DialogTitle>Challenge Details</DialogTitle>
            <DialogContent>
                {challenge && (
                    <div>
                        <Typography variant="subtitle1" gutterBottom>
                            Name: {challenge.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Start Date: {new Date(challenge.challengeStart).toLocaleString()}
                        </Typography>
                        {/* Add more details about the challenge here */}
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChallengeDetailsPopup;