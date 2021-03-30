import React from 'react';

import Divider from 'components/Divider';
import WalletIcon from 'icons/wallet.svg';
import CoreIcon from 'icons/core.svg';
import NexusIcon from 'icons/nexus.svg';
import ContactsIcon from 'icons/address-book.svg';
import TransactionIcon from 'icons/transaction.svg';
import MenuItem from './MenuItem';

export default function SideMenu() {
  return (
    <>
      <MenuItem linkTo="Accounts" icon={WalletIcon} label="Accounts" />
      <MenuItem linkTo="Contacts" icon={ContactsIcon} label="Contacts" />
      <MenuItem
        linkTo="Transactions"
        icon={TransactionIcon}
        label="Transactions"
      />
      <Divider spacing={5} />

      <MenuItem linkTo="CoreInfo" icon={CoreIcon} label="Core information" />
      <MenuItem linkTo="About" icon={NexusIcon} label="About Nexus Wallet" />
      <Divider spacing={10} />
      <MenuItem linkTo="DemoPOS" icon={NexusIcon} label="Point Of Sale Demo" />
      <MenuItem linkTo="DemoTokenize" icon={NexusIcon} label="Tokenize Demo" />
      <MenuItem linkTo="DemoAssets" icon={NexusIcon} label="Asset Demo" />
      <MenuItem
        linkTo="DemoRoyalties"
        icon={NexusIcon}
        label="Royalties Demo"
      />
    </>
  );
}
