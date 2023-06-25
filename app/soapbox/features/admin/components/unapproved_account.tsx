import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { approveUsers } from 'soapbox/actions/admin';
import { rejectUserModal } from 'soapbox/actions/moderation';
import snackbar from 'soapbox/actions/snackbar';
import IconButton from 'soapbox/components/icon_button';
import { useAppSelector, useAppDispatch } from 'soapbox/hooks';
import { makeGetAccount } from 'soapbox/selectors';

const messages = defineMessages({
  approved: { id: 'admin.awaiting_approval.approved_message', defaultMessage: '{acct} was approved!' },
  rejected: { id: 'admin.awaiting_approval.rejected_message', defaultMessage: '{acct} was rejected.' },
});

const getAccount = makeGetAccount();

interface IUnapprovedAccount {
  accountId: string,
}

/** Displays an unapproved account for moderation purposes. */
const UnapprovedAccount: React.FC<IUnapprovedAccount> = ({ accountId }) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const account = useAppSelector(state => getAccount(state, accountId));
  const adminAccount = useAppSelector(state => state.admin.users.get(accountId));

  if (!account) return null;

  const handleApprove = () => {
    dispatch(approveUsers([account.id]))
      .then(() => {
        const message = intl.formatMessage(messages.approved, { acct: `@${account.acct}` });
        dispatch(snackbar.success(message));
      })
      .catch(() => {});
  };

  const handleReject = () => {
    dispatch(rejectUserModal(intl, account.id, () => {
      const message = intl.formatMessage(messages.rejected, { acct: `@${account.acct}` });
      dispatch(snackbar.info(message));
    }));
  };

  return (
    <div className='unapproved-account'>
      <div className='unapproved-account__bio'>
        <div className='unapproved-account__nickname'>@{account.get('acct')}</div>
        <blockquote className='md'>{adminAccount?.invite_request || ''}</blockquote>
      </div>
      <div className='unapproved-account__actions'>
        <IconButton src={require('@tabler/icons/check.svg')} onClick={handleApprove} />
        <IconButton src={require('@tabler/icons/x.svg')} onClick={handleReject} />
      </div>
    </div>
  );
};

export default UnapprovedAccount;
