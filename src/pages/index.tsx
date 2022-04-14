import React from 'react';

export default function Index(): JSX.Element {
  return (
    <>
      <div className={'wrapper'}>
        <h1>
          <span>API</span> pcm-cmm.com
        </h1>
      </div>
      <style jsx global>{`
        html,
        body,
        #__next {
          width: 100%;
          height: 100%;
          margin: 0;

          background: #212121;
        }

        * {
          transition: all 0.3s;
        }
      `}</style>
      <style jsx>{`
        .wrapper {
          width: 100%;
          height: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;

          padding: 0 1.5rem;
        }

        h1 {
          font-family: 'Crimson Pro', serif;
          font-weight: bold;
          font-style: italic;
          font-size: 3.75rem;
          color: #f9c946;
          line-height: 1;

          margin-bottom: 1rem;
        }

        h1 span {
          font-style: normal;
          color: #f9c946;
        }

        .subtitle {
          font-size: 1.25rem;
          color: #f9c946;
          line-height: 1.625;
        }

        .buttons {
          margin: 2rem;
        }

        .buttons a {
          display: inline-block;
          width: 100%;

          color: white;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.5rem;

          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
          border: 1px solid transparent;
          border-radius: 0.375rem;

          padding: 0.75rem 1.5rem;

          background: #f9c946;
        }

        .buttons a:hover {
          background: #f9c946;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.19);
        }

        .buttons a:active {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.17);
        }

        .buttons a:focus {
          background: #f9c946;
          box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.3);

          outline: none;
        }
      `}</style>
    </>
  );
}
