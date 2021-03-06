var chai      = require( 'chai' )
  , expect    = chai.expect
  , exec      = require('child_process').exec
  , path      = require( 'path' )
  , semver    = require( 'semver' )
  , rimraf    = require( 'rimraf' )
  , async     = require( 'async' )
  , fs        = require( 'fs' )
  , binPath   = path.join( __dirname, '..', '..', 'bin' )
  , assetPath = path.join( __dirname, '..', 'assets' );

chai.Assertion.includeStack = true;

describe( 'Install with a backend module', function ( ) {
  before( function ( done ) {
    if (!fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks', 'package.json' ) )) {
      return done( );
    }

    if (require.cache[ path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks', 'package.json' ) ]) {
      delete require.cache[ require.resolve( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks', 'package.json' ) ) ];
    }

    delete require.cache[ require.resolve( path.join( assetPath, 'my-new-project', 'backend', 'package.json' ) ) ];

    async.parallel( [
      async.apply( rimraf, path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks' ) ),
      async.apply( rimraf, path.join( assetPath, 'my-new-project', 'backend', 'node_modules', 'memcached' ) )
    ],
    done );
  } );

  afterEach( function ( done ) {
    if (require.cache.hasOwnProperty( require.resolve( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks', 'package.json' ) ) )) {
      delete require.cache[ require.resolve( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks', 'package.json' ) ) ];
    }

    delete require.cache[ require.resolve( path.join( assetPath, 'my-new-project', 'backend', 'package.json' ) ) ];

    async.parallel( [
      async.apply( rimraf, path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks' ) ),
      async.apply( rimraf, path.join( assetPath, 'my-new-project', 'backend', 'node_modules', 'memcached' ) )
    ],
    done );
  } );

  it( 'within the root directory', function ( done ) {
    exec( path.join( binPath, 'clever-install' ) + ' clever-background-tasks', { cwd: path.join( assetPath, 'my-new-project' ) }, function ( err, stdout, stderr ) {
      expect( stderr ).to.equal( '' );

      expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks', 'package.json' ) ) ).to.be.true;
      expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'node_modules', 'memcached' ) ) ).to.be.true;

      var pkg = require( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks', 'package.json' ) );
      expect( pkg.name ).to.equal( 'clever-background-tasks' );
      expect( semver.gt( pkg.version, '0.0.1' ) ).to.true;

      // we need this here for the tests to pass despite us having a before() block
      delete require.cache[ require.resolve( path.join( assetPath, 'my-new-project', 'backend', 'package.json' ) ) ];

      var projPkg = require( path.join( assetPath, 'my-new-project', 'backend', 'package.json' ) );
      expect( projPkg ).to.have.property( 'bundledDependencies' );
      expect( projPkg.bundledDependencies ).to.include( 'clever-background-tasks' );

      done( err );
    } );
  } );

  it( 'within the backend directory', function ( done ) {
    exec( path.join( binPath, 'clever-install' ) + ' clever-background-tasks', { cwd: path.join( assetPath, 'my-new-project', 'backend' ) }, function ( err, stdout, stderr ) {
      expect( stderr ).to.equal( '' );

      expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks', 'package.json' ) ) ).to.be.true;
      expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'node_modules', 'memcached' ) ) ).to.be.true;

      var pkg = require( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks', 'package.json' ) );
      expect( pkg.name ).to.equal( 'clever-background-tasks' );
      expect( semver.gt( pkg.version, '0.0.1' ) ).to.true;

      var projPkg = require( path.join( assetPath, 'my-new-project', 'backend', 'package.json' ) );
      expect( projPkg ).to.have.property( 'bundledDependencies' );
      expect( projPkg.bundledDependencies ).to.include( 'clever-background-tasks' );

      done( err );
    } );
  } );

  it( 'with a specific version', function ( done ) {
    exec( path.join( binPath, 'clever-install' ) + ' clever-background-tasks@0.0.1', { cwd: path.join( assetPath, 'my-new-project' ) }, function ( err, stdout, stderr ) {
      expect( stderr ).to.equal( '' );

      expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks', 'package.json' ) ) ).to.be.true;
      expect( fs.existsSync( path.join( assetPath, 'my-new-project', 'backend', 'node_modules', 'memcached' ) ) ).to.be.true;

      var pkg = require( path.join( assetPath, 'my-new-project', 'backend', 'modules', 'clever-background-tasks', 'package.json' ) );
      expect( pkg.name ).to.equal( 'clever-background-tasks' );
      expect( pkg.version ).to.equal( '0.0.1' );

      var projPkg = require( path.join( assetPath, 'my-new-project', 'backend', 'package.json' ) );
      expect( projPkg ).to.have.property( 'bundledDependencies' );
      expect( projPkg.bundledDependencies ).to.include( 'clever-background-tasks' );

      done( err );
    } );
  } );
} );
