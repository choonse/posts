import React from 'react';
import AskModal from '../common/AskModal';

const AskRemoveModal = ({visible, onConfirm, onCancel}) => {
    return(
        <AskModal visible={visible} title="포스트 삭제" description="포스트 삭제?" 
        confirmText="삭제" onConfirm={onConfirm} onCancel={onCancel} />
    );
};

export default AskRemoveModal;