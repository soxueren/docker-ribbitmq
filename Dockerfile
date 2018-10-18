FROM rabbitmq:3.7-management
MAINTAINER jxw <jxw608@petrochina.com.cn>

RUN cd ~

# Install rabbitmq_web_stomp
RUN rabbitmq-plugins enable rabbitmq_stomp && \
    rabbitmq-plugins enable rabbitmq_web_stomp && \
    rabbitmq-plugins enable rabbitmq_web_stomp_examples && \
    service rabbitmq-server stop 

# Add scripts
ADD scripts /scripts
RUN chmod +x /scripts/*.sh
RUN touch /.firstrun

# Command to run
ENTRYPOINT ["/scripts/run.sh"]
CMD [""]

# Expose listen port
EXPOSE 5672 15672  15674

# Expose our log volumes
VOLUME ["/var/log/rabbitmq"]
