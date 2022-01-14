import React from 'react';
import { connect } from 'react-redux';
import { connectBooks, disconnectBooks, precisionChange } from '../model/control/message';
import { controlState } from '../model/control/selector';

export const PairTitle = ({ pair }) => (
    <b>{pair}</b>
)

export const StatusBar = ({ className, control, connect, disconnect, changePrecision }) => (
    <div className={className} style={{justifyContent: 'space-between'}}>
        <div><PairTitle pair={control.pair} /></div>
        <div>
            <code>{control.connectStatus}</code>
            <button type='button' onClick={connect} disabled={control.connectStatus !== 'DISCONNECTED'}>Connect</button>
            <button type='button' onClick={disconnect} disabled={control.connectStatus !== 'SUBSCRIBED'}>Disconnect</button>
        </div>
        <div>
            <span>select precision</span>
            <select
                name='precision'
                value={control.precision}
                onChange={(evt) => changePrecision(evt.target.value)}
                disabled={control.inProgress}
            >
                <option value='P0'>'P0'</option>
                <option value='P1'>'P1'</option>
                <option value='P2'>'P2'</option>
                <option value='P3'>'P3'</option>
                <option value='P4'>'P4'</option>
                <option value='P5'>'P5'</option>
            </select>
        </div>
    </div>
)

export const ConnectedStatusBar = connect(
    (state) => ({
        control: controlState(state),
    }),
    {
        connect: connectBooks,
        disconnect: disconnectBooks,
        changePrecision: precisionChange,
    },
)(StatusBar)

