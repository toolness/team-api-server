# team-api-server

This server publishes static websites for [18F Pages](https://pages.18f.gov/).
It works very similarly to [GitHub pages](https://pages.github.com/). It
automatically publishes [Jekyll](http://jekyllrb.com/)-based web sites
whenever updates are made to a publishing branch (like `gh-pages`, but where
the name of the branch is defined by the server's configuration). It also
supports publishing via [`rsync`](https://rsync.samba.org/) if the publishing
branch does not contain a Jekyll-based site.

### <a name="config"></a>Generate and configure `team-api-config.json`

Run `team-api print-template > path/to/team-api-config.json` to generate a
`team-api-config.json` file. Edit this file to support your installation.

The template is a copy of the [`team-api-config.json`](./team-api-config.json)
from this repository, which is based on the actual configuration for the 18F
Team API server, and illustrates each of the following settings:

* **branch**: the repository branch from which to extract update information
* **buildPort**: the port on which the server will listen for `push` events to
  the team-api.18f.gov repo
* **updatePort**: the port on which the server will listen for updates to
  `.about.yml` files from other 18F repos
* **dataPort**: the port on which the server will listen for `push` events to
  the data-private repo
* **git**:  path to `git` on the host machine
* **ruby**: path to `ruby` on the host machine
* **workingDir**: path to the 18F/team-api.18f.gov repository clone on the
  host machine
* **updateScript**: path to the Ruby script used to process `.about.yml` file
  updates

## <a name="installation"></a>Installing the `team-api` server

Install the following if they are not yet present on your system:

* [Node.js](https://nodejs.org/) version 0.12.7 or higher;
  check with `node -v`
* [Ruby](https://www.ruby-lang.org/) version 2.2.3 or higher;
  check with `ruby -v`
* [Git](https://git-scm.com/) version 1.9.1 or higher;
  check with `git --version`

For Ruby, we strongly recommend using a version manager such as
[rbenv](https://github.com/sstephenson/rbenv) or [rvm](https://rvm.io/),
though this is not required.

`rsync` should already be installed on most UNIX-like systems, but the
`rsyncOpts` [configuration option](#config) may require adjustment,
particularly on OS X. You may wish to experiment with `rsync` manually to
determine which options suit you best.

With the correct Node.js, Ruby, and Git versions in place, run the following:

```sh
$ gem install jekyll bundler
$ npm install -g team-api-server forever
```
Finally, as the user on the host that will run the server,
[generate an SSH key to add to your GitHub
account](https://help.github.com/articles/generating-ssh-keys/). A new key can
be generated by another team member should you leave the organization.


### Run the `team-api` server

After that, run the following to launch the server via
[Forever](https://www.npmjs.com/package/forever), where `/path/to/` and
`/usr/local/bin/` are replaced with the appropriate absolute paths:

```sh
$ forever start -l /path/to/team-api.log -a /usr/local/bin/team-api /path/to/team-api-config.json
```

You can find the absolute path to `team-api` by running `which team-api`.

## Contributing

1. Fork the repo (or just clone it if you're an 18F team member)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Make your changes and test them via `npm test` or `gulp test`
4. Lint your changes with `gulp lint`
5. Commit your changes (`git commit -am 'Add some feature'`)
6. Push to the branch (`git push origin my-new-feature`)
7. Create a new Pull Request

Feel free to [file an issue](https://github.com/18F/team-api-server/issues) or
to ping [@mbland](https://github.com/mbland) with any questions you may have,
especially if the current documentation should've addressed your needs, but
didn't.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in
[CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright
> and related rights in the work worldwide are waived through the
> [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication.
> By submitting a pull request, you are agreeing to comply with this waiver of
> copyright interest.
